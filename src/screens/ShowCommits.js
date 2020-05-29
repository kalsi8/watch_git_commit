import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Pagination from '../components/Pagination';
import {getCommits} from '../service';
import AsyncStorage from '@react-native-community/async-storage';

const ShowCommitsStyle = StyleSheet.create({
  commitCard: {
    padding: 10,
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#888888',
    padding: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 80,
    borderColor: '#000000',
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },
  usernameText: {
    fontSize: 20,
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
  },
  comment: {
    padding: 10,
    fontSize: 14,
    backgroundColor: '#ffffff',
  },
});

function ShowCommits({route, navigation}) {
  const {
    params: {repo, owner, Authorization},
  } = route;
  const getCard = ({node_id, committer, commit: {message}}) => {
    const avatar_url =
      (committer && committer.avatar_url) ||
      'https://www.gravatar.com/avatar/HASH';
    const login = (committer && committer.login) || 'username not defined';
    return (
      <View style={ShowCommitsStyle.commitCard} key={node_id}>
        <View style={ShowCommitsStyle.header}>
          <Image
            style={ShowCommitsStyle.profileImage}
            source={{uri: avatar_url}}
          />
          <Text style={ShowCommitsStyle.usernameText}>{login}</Text>
        </View>
        <Text style={ShowCommitsStyle.comment}>{message}</Text>
      </View>
    );
  };

  const getList = async page => {
    const {data} = await getCommits({
      repo,
      owner,
      Authorization,
      page,
      goBack: () => {
        navigation.goBack();
      },
      logout: () => {
        AsyncStorage.removeItem('Authorization');
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'GetDetails',
              params: {
                placeholder: 'Enter your github login',
                key: 'username',
              },
            },
          ],
        });
      },
    });
    return data || [];
  };
  return <Pagination getCard={getCard} getList={getList} />;
}

export default ShowCommits;
