import React from 'react';

import { ScrollView,TitleView,SubtitleView } from './styles';

function HorizonScrollView(props) {
  return (
<>
<TitleView>{props.title}</TitleView>
<SubtitleView>{props.subtitle}</SubtitleView>
<ScrollView>
    {props.children}
</ScrollView>
 </> );
}

export default HorizonScrollView;