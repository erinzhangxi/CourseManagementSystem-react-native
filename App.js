import React from 'react';
import { StyleSheet, View, StatusBar, ScrollView } from 'react-native';
import {Button, Divider, Text} from 'react-native-elements'
import FixedHeader from './elements/FixedHeader'
import QuestionTypePicker from './elements/QuestionTypePicker'
import TrueOrFalseQuestionWidget from './elements/TrueOrFalseQuestionWidget'
import MultipleChoiceQuestionWidget from './elements/MultipleChoiceQuestionWidget'
import { createStackNavigator } from 'react-navigation'
import ScreenX from './elements/ScreenX'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'
import AssignmentWidget from './components/AssignmentWidget'
import AssignmentList from './components/AssignmentList'
import ExamWidget from './components/ExamWidget'
import QuestionWidget from './components/QuestionWidget'
import FillInTheBlanksQuestionWidget from './elements/FillInTheBlanksQuestionWidget'
import EssayQuestionWidget from './elements/EssayQuestionWidget'

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <ScrollView>

        <StatusBar barStyle="light-content"/>
        <FixedHeader/>

          <Divider style={{
              backgroundColor:
                  'blue' }}/>
          <View style={{padding:15}}>
          <Text h4 style={{color:'blue', fontWeight:'bold'}}>Welcome to Course Manager</Text>
          <Text h5 style={{padding: 15, fontWeight:'bold'}}>You may navigate to courses from the button below.</Text>
        <Button title="Courses"
                onPress={() => this.props.navigation
                  .navigate('CourseList') } />

</View>
      </ScrollView>
    )
  }
}

const App = createStackNavigator({
  Home,
  CourseList,
  ModuleList,
  LessonList,
  WidgetList,
  QuestionList,
    TrueOrFalseQuestionWidget,
    MultipleChoiceQuestionWidget,
    FillInTheBlanksQuestionWidget,
  ScreenX,
    AssignmentWidget,
    AssignmentList,
    ExamWidget,
    EssayQuestionWidget
});

export default App;
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
