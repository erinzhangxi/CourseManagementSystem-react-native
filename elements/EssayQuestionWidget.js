import React from 'react'
import {View, ScrollView, TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'

class EssayQuestionWidget extends React.Component {
    static navigationOptions = { title: "Essay Question"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: 0,
            text: '',
            examId: '1',
            lessonId: '1'
        }
        this.submitForm = this.submitForm.bind(this);
        this.updateForm = this.updateForm.bind(this);
    }

    componentDidMount() {
        const examId = this.props.navigation.getParam("examId");
        const lessonId = this.props.navigation.getParam("lessonId");
        this.setState({
            lessonId: lessonId,
            examId: examId
        })
    }

    submitForm(examId) {
        let essay = {
            title: this.state.title,
            subtitle:this.state.description,
            type: "Essay",
            points: this.state.points,
            answers: this.state.text
        };
        alert("Your form is successfully submitted.");
        fetch('http://localhost:8080/api/exam/EID/essay'.replace('EID', examId), {
            body: JSON.stringify(essay),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then(response => (response.json()));
        this.props.navigation
            .navigate('QuestionList');
    }


    updateForm(newState) {
        this.setState(newState)
    }
    render() {
        return(
            <ScrollView>
                <Text h4>Exam ID is {this.state.examId}</Text>
                <View style={{padding: 15}}>
                    <FormLabel>Question Title</FormLabel>
                    <FormInput onChangeText={
                        title => this.updateForm({title: title})
                    }/>
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage>
                    <FormLabel>Description</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({description: text})
                    }/>
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage>

                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({point: text})
                    }/>
                    <FormValidationMessage>
                        Point is required
                    </FormValidationMessage>

                    <Text>
                        {"\n"}
                    </Text>

                    <Text>
                        {"\n"}
                    </Text>


                    <Text h3>Preview</Text>
                    <Text h2>{this.state.title}</Text>
                    <Text>{this.state.description}</Text>
                    <Text h5 style={{textAlign: 'right'}}>{this.state.point} points</Text>

                    <Text>
                        {"\n"}
                    </Text>

                    <View style={{padding: 15}}>

                        <TextInput
                            placeholder="Student answer essay question here"
                            style={{height: 80, borderColor: 'gray', borderWidth: 1}}
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}/>

                    </View>
                    <Button	backgroundColor="red"
                               color="white"
                               title="Cancel"
                               onPress={() => this.props.navigation
                                   .goBack() }/>
                    <Button	backgroundColor="blue"
                               color="white"
                               title="Submit"
                               onPress={()=> this.submitForm(this.state.examId)}/>


                    <Text>
                        {"\n"}
                    </Text>

                </View>
            </ScrollView>
        )
    }
}

export default EssayQuestionWidget