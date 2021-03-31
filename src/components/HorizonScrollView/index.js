import React from 'react';

import { ScrollView,TitleView,SubtitleView } from './styles';

function HorizonScrollView(props) {
  return (
<>
{props.title && <TitleView>{props.title}</TitleView>}
{props.subtitle && <SubtitleView>{props.subtitle}</SubtitleView>}
<ScrollView>
    {props.children}
</ScrollView>
 </> );
}

export default HorizonScrollView;