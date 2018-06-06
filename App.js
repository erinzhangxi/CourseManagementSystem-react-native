import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import {Button, Divider} from 'react-native-elements'
import FixedHeader from './elements/FixedHeader'
import TextHeadings from './elements/TextHeadings'
import Icons from './elements/Icons'
import Exam from './elements/Exam'
import QuestionTypeButtonGroupChooser from './elements/QuestionTypeButtonGroupChooser'
import QuestionTypePicker from './elements/QuestionTypePicker'
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'
import MultipleChoiceQuestionEditor from './elements/MultipleChoiceQuestionEditor'
import { createStackNavigator } from 'react-navigation'
import ScreenX from './elements/ScreenX'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'
import AssignmentWidget from './components/AssignmentWidget'
import AssignmentList from './components/AssignmentList'
import ExamList from './components/ExamList'
import QuestionWidget from './components/QuestionWidget'
import BlanksQuestionEditor from './elements/BlanksQuestionEditor'
import EssayQuestionEditor from './elements/EssayQuestionEditor'

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

        <MultipleChoiceQuestionEditor />
          <Divider style={{
              backgroundColor:
                  'blue' }}/>

        <Button title="Courses"
                onPress={() => this.props.navigation
                  .navigate('CourseList') } />
        <Button title="Go to Screen X"
                onPress={() => this.props.navigation
                  .navigate('ScreenX') } />
        <Button title="Go to Screen A"
                onPress={() => this.props.navigation
                  .navigate('ScreenA') } />
        <Button title="Go to Screen B"
                onPress={() => this.props.navigation
                  .navigate('ScreenB') } />

          {/*<Exam/>*/}
        <TrueFalseQuestionEditor/>

        <QuestionTypeButtonGroupChooser/>
        <QuestionTypePicker/>



        <Icons/>
        <View style={{padding: 20}}>
          <TextHeadings/>
        </View>
      </ScrollView>
    )
  }
}

class ScreenA extends React.Component {
  static navigationOptions = {title: "Screen A"}
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View>
        <Text h1>Screen A</Text>
        <Button title="Go Home"
                onPress={() =>this.props
                  .navigation
                  .goBack()} />
      </View>
    )
  }
}

const ScreenB = () => (
  <View>
    <Text h1>Screen B</Text>
  </View>
)

const App = createStackNavigator({
  Home,
  CourseList,
  ModuleList,
  LessonList,
  WidgetList,
  QuestionList,
  TrueFalseQuestionEditor,
  MultipleChoiceQuestionEditor,
    BlanksQuestionEditor,
  ScreenA,
  ScreenB,
  ScreenX,
    AssignmentWidget,
    AssignmentList,
    ExamList,
    EssayQuestionEditor
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
