import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, FlatList} from 'react-native';
import DoubleClick from 'react-native-double-tap';

import api from '../../services/api';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import LazyImage from '../../components/LazyImage';

import {
  Post,
  Header,
  Avatar,
  Name,
  PostImage,
  Description,
  Loading,
  Actions,
  LikeCmtShare,
} from './styles';

export default function Feed() {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const onViewRef = useRef(({changed}) => {
    setViewable(changed.map(({item}) => item.id));
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 20});

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    setLoading(true);

    const response = await fetch(
      `http://192.168.15.4:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`,
    );

    const data = await response.json();
    const totalItems = response.headers.get('X-Total-Count');

    setTotal(Math.floor(totalItems / 5));
    setFeed(shouldRefresh ? data : [...feed, ...data]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadPage();
  }, [trigger]);

  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  /*  const handleViewableChange = useCallback(({changed}) => {
    setViewable(changed.map(({item}) => item.id));
  }, []);*/

  async function toggleLiked(item) {
    try {
      const toggledItem = {...item, liked: !item.liked};

      feed.map(post =>
        post.id === item.id
          ? feed.splice(feed.indexOf(post), 1, toggledItem)
          : null,
      );

      setTrigger(!trigger);

      await api.put(`/feed/${item.id}`, toggledItem);
    } catch (err) {
      console.log(item);
    }
  }

  async function toggleBookmarked(item) {
    try {
      const toggledItem = {...item, bookmarked: !item.bookmarked};

      feed.map(post =>
        post.id === item.id
          ? feed.splice(feed.indexOf(post), 1, toggledItem)
          : null,
      );

      setTrigger(!trigger);

      await api.put(`/feed/${item.id}`, toggledItem);
    } catch (err) {
      console.log(item);
    }
  }

  return (
    <View>
      <FlatList
        data={feed}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        onRefresh={refreshList}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        refreshing={refreshing}
        ListFooterComponent={loading && <Loading />}
        keyExtractor={post => String(post.id)}
        renderItem={({item}) => (
          <Post>
            <Header>
              <Avatar source={{uri: item.author.avatar}} />
              <Name>{item.author.name}</Name>
            </Header>
            <DoubleClick doubleTap={() => toggleLiked(item)}>
              <LazyImage
                shouldLoad={viewable.includes(item.id)}
                aspectRatio={item.aspectRatio}
                smallSource={{uri: item.small}}
                source={{uri: item.image}}
              />
            </DoubleClick>
            <Actions>
              <LikeCmtShare>
                <Icon
                  name={item.liked ? 'heart' : 'heart-outline'}
                  color={item.liked ? 'red' : 'black'}
                  onPress={() => toggleLiked(item)}
                  size={30}
                />
                <Icon name="comment-outline" size={30} />
                <Icon name="share-outline" size={30} />
              </LikeCmtShare>
              <Icon
                name={item.bookmarked ? 'bookmark' : 'bookmark-outline'}
                size={30}
                onPress={() => toggleBookmarked(item)}
              />
            </Actions>
            <Description>
              <Name>{item.author.name}</Name> {item.description}
            </Description>
          </Post>
        )}
      />
    </View>
  );
}
