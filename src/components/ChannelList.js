import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  SectionList,
  Image
} from "react-native";
import { ChannelListItem } from "./ChannelListItem";

export const ChannelList = ({ client, changeChannel }) => {
  const {
    activeChannelId,
    setActiveChannelId,
    unreadChannels,
    readChannels,
    oneOnOneConversations
  } = useWatchedChannels(client, changeChannel);

  const renderChannelRow = (channel, isUnread) => {
    const isOneOnOneConversation =
      Object.keys(channel.state.members).length === 2;

    return (
      <ChannelListItem
        activeChannelId={activeChannelId}
        setActiveChannelId={setActiveChannelId}
        changeChannel={changeChannel}
        isOneOnOneConversation={isOneOnOneConversation}
        isUnread={isUnread}
        channel={channel}
        client={client}
        key={channel.id}
        currentUserId={client.user.id}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={{ paddingLeft: 10 }}>
            <Image
              style={{
                //flex: 1,
                aspectRatio: Platform.OS === "ios" ? 2.5 : 3.0,
                resizeMode: "contain",
                height: 80,
                width: 100
              }}
              source={require("../../assets/collabapp.png")}
            />
            <TextInput
              style={styles.inputSearchBox}
              placeholderTextColor="grey"
              placeholder="Search"
            />
          </View>
        </View>

        <SectionList
          style={styles.sectionList}
          sections={[
            {
              title: "Unread",
              /**
               * As you can note here, I have supplied `isUnread: true` to unread section data.
               * This way I can tell the renderChannelRow function if the current channel to render
               * is unread or now. Its not utterly necessary since you can easily get unread count
               * of channel in renderChannelRow using channel.unreadCount() to decide if its
               * read or unread. But its just a way to avoid extra call to channel.countUnread()
               * - which basically loops through messages.
               */
              isUnread: true,
              data: unreadChannels || []
            },
            {
              title: "Channels",
              isUnread: false,
              data: readChannels || []
            },
            {
              title: "Direct Messages",
              isUnread: false,
              data: oneOnOneConversations || []
            }
          ]}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item, section }) => {
            return renderChannelRow(item, section.isUnread);
          }}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.groupTitleContainer}>
              <Text style={styles.groupTitle}>{title}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
const useWatchedChannels = (client, changeChannel) => {
  const [activeChannelId, setActiveChannelId] = useState(null);
  const [unreadChannels, setUnreadChannels] = useState([]);
  const [readChannels, setReadChannels] = useState([]);
  const [oneOnOneConversations, setOneOnOneConversations] = useState([]);
  const [hasMoreChannels, setHasMoreChannels] = useState(true);
  const filters = {
    type: "messaging",
    example: "slack-demo",
    members: {
      $in: [client.user.id]
    }
  };

  const sort = { has_unread: -1, cid: -1 };
  const options = { limit: 30, state: true };

  useEffect(() => {
    if (!hasMoreChannels) {
      return;
    }

    let offset = 0;
    const _unreadChannels = [];
    const _readChannels = [];
    const _oneOnOneConversations = [];

    /**
     * fetchChannels simply gets the channels from queryChannels endpoint
     * and sorts them by following 3 categories:
     *
     * - Unread channels
     * - Channels (read channels)
     * - Direct conversations/messages
     */
    async function fetchChannels() {
      const channels = await client.queryChannels(filters, sort, {
        ...options,
        offset
      });

      offset = offset + channels.length;
      channels.forEach(c => {
        if (c.countUnread() > 0) {
          _unreadChannels.push(c);
        } else if (Object.keys(c.state.members).length === 2) {
          _oneOnOneConversations.push(c);
        } else {
          _readChannels.push(c);
        }
      });

      setUnreadChannels([..._unreadChannels]);
      setReadChannels([..._readChannels]);
      setOneOnOneConversations([..._oneOnOneConversations]);

      if (channels.length === options.limit) {
        fetchChannels();
      } else {
        setHasMoreChannels(false);
        setActiveChannelId(_readChannels[0].id);
        changeChannel(_readChannels[0].id);
      }
    }

    fetchChannels();
  }, [client]);

  useEffect(() => {
    function handleEvents(e) {
      if (e.type === "message.new") {
        const cid = e.cid;

        // Check if the channel (which received new message) exists in group channels.
        const channelReadIndex = readChannels.findIndex(
          channel => channel.cid === cid
        );

        if (channelReadIndex >= 0) {
          // If yes, then remove it from reacChannels list and add it to unreadChannels list
          const channel = readChannels[channelReadIndex];
          readChannels.splice(channelReadIndex, 1);
          setReadChannels([...readChannels]);
          setUnreadChannels([channel, ...unreadChannels]);
        }

        // Check if the channel (which received new message) exists in oneOnOneConversations list.
        const oneOnOneConversationIndex = oneOnOneConversations.findIndex(
          channel => channel.cid === cid
        );
        if (oneOnOneConversationIndex >= 0) {
          // If yes, then remove it from oneOnOneConversations list and add it to unreadChannels list
          const channel = oneOnOneConversations[oneOnOneConversationIndex];
          oneOnOneConversations.splice(oneOnOneConversationIndex, 1);
          setOneOnOneConversations([...oneOnOneConversations]);
          setUnreadChannels([channel, ...unreadChannels]);
        }

        // Check if the channel (which received new message) already exists in unreadChannels.
        const channelUnreadIndex = unreadChannels.findIndex(
          channel => channel.cid === cid
        );
        if (channelUnreadIndex >= 0) {
          const channel = unreadChannels[channelUnreadIndex];
          unreadChannels.splice(channelUnreadIndex, 1);
          setReadChannels([...readChannels]);
          setUnreadChannels([channel, ...unreadChannels]);
        }
      }

      if (e.type === "message.read") {
        if (e.user.id !== client.user.id) {
          return;
        }
        const cid = e.cid;
        // get channel index
        const channelIndex = unreadChannels.findIndex(
          channel => channel.cid === cid
        );
        if (channelIndex < 0) {
          return;
        }

        // get channel from channels
        const channel = unreadChannels[channelIndex];

        unreadChannels.splice(channelIndex, 1);
        setUnreadChannels([...unreadChannels]);

        if (Object.keys(channel.state.members).length === 2) {
          setOneOnOneConversations([channel, ...oneOnOneConversations]);
        } else {
          setReadChannels([channel, ...readChannels]);
        }
      }
    }

    client.on(handleEvents);

    return () => {
      client.off(handleEvents);
    };
  }, [client, readChannels, unreadChannels, oneOnOneConversations]);

  return {
    activeChannelId,
    setActiveChannelId,
    unreadChannels,
    setUnreadChannels,
    readChannels,
    setReadChannels,
    oneOnOneConversations,
    setOneOnOneConversations
  };
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "100%"
  },
  headerContainer: {
    //padding: 10,
    //marginRight: 10,
    justifyContent: "center",
    textAlign: "center",
    marginRight: 50
  },
  inputSearchBox: {
    backgroundColor: "#AAB8C2",
    padding: 10,
    borderRadius: 25
  },
  sectionList: {
    flexGrow: 1,
    flexShrink: 1
  },
  groupTitleContainer: {
    padding: 10,
    borderBottomColor: "#F5F8FA",
    borderBottomWidth: 0.3,
    marginBottom: 7
  },
  groupTitle: {
    color: "white",
    fontWeight: "100",
    fontSize: 12,
    fontFamily: "Lato-Regular"
  }
});
