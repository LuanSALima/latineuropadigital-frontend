import React from 'react';

import { ScrollView } from './styles';

function HorizonScrollView(props) {
  return (
<ScrollView>
    {props.children}
</ScrollView>
  );
}

export default HorizonScrollView;