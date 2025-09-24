import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
const PostList = ({posts}) => {
    return(
        <View>
            {posts.map((post, index) => (
            <View key={index}
        style={styles.container}>
            <Text style={StyleSheet.author}>{post.author?.name}</Text>
            <Text
        style={StyleSheet.content}>{post.content}</Text> 
         {post.flagged && (
            <Text
    style={styles.warning}>Warning:This post may be misleading or harmful.</Text>
         )} 
        </View>
    ))}
    </View>
    );
};
const styles = StyleSheet.create({
    container: {margin:10, padding:10, borderBottomWidth:1,borderColor: '#ccc'},
    author: {fortWeight: 'bold'},
    content: {marginVertical:5},
    warning: {color:'red',fontSize:12}
});
export default PostList;