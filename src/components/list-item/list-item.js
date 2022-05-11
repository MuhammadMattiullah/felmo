import React, { memo } from 'react';
import FastImage from 'react-native-fast-image';
import { placeholderImageSrc } from '../../utils/constants';

import {
    StyledImage,
    StyledWrapper,
    PetInfoWrapper,
    Title,
    Container,
    SubTitle,
} from './styled';

// import { defaultProps, propTypes } from './props';

/**
 * Carousel Item component of individual List Item containing info
 */

export const SEX_MAP = {
    1: 'dog',
    2: 'cat'
}

export const ListItem =
    memo(({
        imageSrc,
        name,
        sex,
    }) => {
        const uri = imageSrc ?? placeholderImageSrc;
        return (
            <Container>
                <StyledWrapper>
                    <StyledImage
                        priority={FastImage.priority.low}
                        source={{ uri: uri }}
                    />
                    <PetInfoWrapper>
                        <Title>
                            {name}
                        </Title>
                        <SubTitle>
                            {sex}
                        </SubTitle>
                    </PetInfoWrapper>
                </StyledWrapper>
            </Container>
        )
    });

