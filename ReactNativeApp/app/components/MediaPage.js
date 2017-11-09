import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { Image } from 'react-native'
import PhotoUpload from 'react-native-photo-upload'
import requester from '../requester';

class MediaPage extends React.Component {

  onPhotoSelect(avatar) {
    requester.postRequest('http://localhost:3000/media', avatar);
  }

  render() {
    return (
      <PhotoUpload
      onPhotoSelect={this.onPhotoSelect.bind(this)}
    >
      <Image
        style={{
          paddingVertical: 30,
          width: 150,
          height: 150,
          borderRadius: 75
        }}
        resizeMode='cover'
        source={{
          uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
        }}
      />
    </PhotoUpload>
     ) 
  }
}

export default MediaPage;
