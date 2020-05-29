/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';

function Pagination({getList, getCard}) {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  useEffect(() => {
    getList(page).then(data => {
      setList([...list, ...data]);
    });
  }, [page]);

  return (
    <FlatList
      data={list}
      onEndReached={() => {
        setPage(page + 1);
      }}
      onEndReachedThreshold={0.5}
      keyExtractor={row => row.node_id}
      renderItem={({item}) => getCard(item)}
    />
  );
}

export default Pagination;
