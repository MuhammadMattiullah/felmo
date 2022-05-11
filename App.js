/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type { Node } from 'react';

import { Picker } from '@react-native-community/picker';

import {
  FlatList,
  StatusBar,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { get, post } from './src/utils/fetch';
import { ListItem, SEX_MAP } from './src/components/list-item/list-item';
import styled from 'styled-components';
import { SvgXml } from 'react-native-svg';
import { searchIconSvg } from './src/utils/constants';

const StyledTextInput = styled(TextInput)`
  border: red;
  padding: 4px;
  padding-left: 25px;
  color: red;
  border-radius: 8px;
  font-size: 16;
  width: 80%;
  align-self: center;
  margin-top: 80px;
  zIndex: 999;
`;

export const LeftIconWrapper = styled.View`
  position: absolute;
  top: 80;
  bottom: 0;
  left: 45;
  justify-content: center;
  align-items: center;  
`;

export const SearchIconInput = styled(SvgXml)`
  height: 14px;
  width: 14px;
`;


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [data, setData] = useState([]);
  const [filterValue, seFilterValue] = useState('3');
  const [nameFilter, setNameFilter] = useState([]);
  const [specFilter, setSpecFilter] = useState([]);
  const [text, setText] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const authorizeUser = async () => {
    await post();
    let data = await get();
    setData(data);
  }

  /**
   * Render item to display the card
   */
  const renderItem = ({ item }) => {
    return (
      <ListItem
        imageSrc={item.image_url}
        name={item.name}
        sex={SEX_MAP[item.species_id]}
      />
    )
  }

  /**
   * Callback to filter the data based on the name of pet 
   * entered into the input field
   */
  const onEndEditing = (text) => {
    const filtered = data.filter((pet) => pet.name == text);
    setNameFilter(filtered);
  }

  /**
   * Callback to filter the data based on the selected
   * species category
   */
  const onSelectFilter = (text) => {
    const filtered = data.filter((pet) => pet.species_id == text);
    setSpecFilter(filtered);
  }

  /**
   * To get the list of pets after authorizing the user
   */
  useEffect(() => {
    authorizeUser();
  }, []);

  /**
   * Reseting the textinput filter upon clearing the 
   * textinput field
   */
  useEffect(() => {
    if (text?.length == 0) {
      setNameFilter([]);
    }
  }, [text]);


  const renderFlatListData = (data) => {
    if (!!data.length) {
      return (
        <FlatList
          data={data}
          keyboardShouldPersistTaps='handled'
          keyExtractor={(item) => `list-carousel-${item.id}`}
          listKey={`list-carousel`}
          renderItem={renderItem}
        />
      )
    }
  }

  /**
   * This function is responsible to render the list
   * of data based on the data or filters in it
   */
  const renderData = () => {
    if (!!nameFilter.length) {
      return renderFlatListData(nameFilter)
    } else if (!!specFilter.length) {
      return renderFlatListData(specFilter);
    } else {
      return renderFlatListData(data);
    }
  }

  return (
    <View style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {
        /**
         * This wrapper is to make the icon embedded within in textinput
         */
      }
      <View>
        <LeftIconWrapper>
          <SearchIconInput fill={'red'} size={10} xml={searchIconSvg} />
        </LeftIconWrapper>
        <StyledTextInput
          returnKeyType='search'
          onSubmitEditing={({ nativeEvent }) => onEndEditing(nativeEvent.text)}
          onChangeText={setText}
          value={text}
          placeholder="Search pet by name"
        />
      </View>


      <View  >
        <Picker
          selectedValue={filterValue}
          placeholder='Select Pet Specs...'
          onValueChange={(itemValue) => {
            seFilterValue(itemValue)
            onSelectFilter(itemValue)
          }
          }>
          <Picker.Item label="Select Category" value="3" />
          <Picker.Item label="Dog" value="1" />
          <Picker.Item label="Cat" value="2" />
        </Picker>
      </View>

      {
        renderData()
      }

    </View>
  );
};

export default App;
