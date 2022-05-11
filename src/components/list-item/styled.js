import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

export const StyledImage = styled(FastImage)`
    resize-mode: ${FastImage.resizeMode.contain};
    width:  100%;
    height: 250px;
    border-radius: 8px;
`;

export const StyledWrapper = styled.View` 
    align-items: center;
`;

export const PetInfoWrapper = styled.View` 
    position: absolute;
    background-color: rgba(12, 12, 12, 0.5);
    bottom: 0;
    padding: 4px;
    border-radius:  8px;
    height: 80px;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 18;
`;

export const SubTitle = styled.Text`
    color: orange;
    font-weight: bold;
    font-size: 18;
`;

export const MetaInfo = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 8px;
`;

export const Container = styled.View`
    margin: 10px;
`;
