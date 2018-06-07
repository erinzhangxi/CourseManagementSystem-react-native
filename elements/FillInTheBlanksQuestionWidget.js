import React from 'react'
import {View, ScrollView, TextInput} from 'react-native'
import {Text, Button, CheckBox, ListItem} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'

class FillInTheBlanksQuestionWidget extends React.Component {
    static navigationOptions = { title: "Fill In the Blank Question"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: 0,
            question: '',
            answers: [],    // student's answers stored as a list of variables
            prompts: [{type: '', value:''}],
            variables: []
        }
        this.parseQuestion = this.parseQuestion.bind(this);
        this.storeVariable = this.storeVariable.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.renderInputBox = this.renderInputBox.bind(this);
        this.addTextBox = this.addTextBox.bind(this);
    }
    componentDidMount() {
        const lessonId = this.props.navigation.getParam("lessonId");
        const examId = this.props.navigation.getParam("examId");
        this.setState({
            lessonId: lessonId,
            examId: examId
        })
    }

    updateForm(newState) {
        this.setState(newState);
    }
    submitForm(examId) {
        let blank = {
            title: this.state.title,
            subtitle:this.state.description,
            type: "FillInTheBlank",
            points: this.state.points,
            variables: JSON.stringify(this.state.variables)
        };
        alert("Your form is successfully submitted.");
        fetch('http://localhost:8080/api/exam/EID/blanks'.replace('EID', examId), {
            body: JSON.stringify(blank),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then(response => (response.json()));
        this.props.navigation
            .navigate('QuestionList');
    }

    storeVariable = (str) => {
        this.setState(prevState => ({
            variables: [...prevState.variables, str]
        }))
    }
    storePrompt = (str) => {
        this.setState(prevState => ({
            prompts: [...prevState.prompts, {type:"text", value: str}]
        }))
    }
    addTextBox= (variable) => {
        this.setState(prevState => ({
            prompts: [...prevState.prompts, {type:"variable", value: variable}]
        }))
    }

    // modify question to render input text field whenever there's a bracket
    parseQuestion() {
        alert('question added');
        let copy = this.state.question;
        let chars = [];
        chars = this.state.question.split('');
        let left, right = 0;
        let variable = '';

        for(let i = 0; i < chars.length; i++) {

            if (chars[i] === '[') {
                left = i+1;
            } else if (chars[i] === ']') {
                right = i;
                variable = copy.substring(left, right);

                this.storeVariable(variable)
                variable = '';
            } else {

            }
        }
        this.renderInputBox();
    }
    renderInputBox() {
        let copy = this.state.question;
        let chars = [];
        chars = this.state.question.split('');
        let left, right = 0;
        let boxstart, boxend= 0;
        let temp = '';
        let variable ='';
        for(let i = 0; i < chars.length; i++) {

            if (chars[i] === '[') {
                boxstart=i+1;
                right = i;
                temp = copy.substring(left, right);
                this.storePrompt(temp)
                temp = '';
            } else if (chars[i] === ']') {
                boxend=i;
                left = i+1;
                variable = copy.substring(boxstart, boxend);
                this.addTextBox(variable);
            } else {

            }
        }
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

                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({point: text})
                    }/>
                    <FormValidationMessage>
                        Point is required
                    </FormValidationMessage>


                    <FormLabel>Description</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({description: text})
                    }/>
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage>

                    <FormLabel>Question</FormLabel>
                    <FormInput placeholder="use bracket for student's input, i.e. 2+2=[four=4]"
                               onChangeText={
                                   text => this.updateForm({question: text})
                               }/>
                    <Button title="confirm"
                            onPress={()=> this.parseQuestion()}/>
                    <FormValidationMessage>
                        Question is required
                    </FormValidationMessage>

                    <Text>
                        {"\n"}
                    </Text>

                    <Text>
                        {"\n"}
                    </Text>

                    <View style={{padding: 15}}>
                        <Text h3>Preview</Text>
                        <Text h2>{this.state.title}</Text>
                        <Text h5 style={{textAlign: 'right'}}>{this.state.point} points</Text>
                        <Text h4>{this.state.description}</Text>
                        <Text>
                            {"\n"}
                        </Text>

                        {this.state.prompts.map((row, index) => {
                            if (row.type === 'text') {
                                return <Text key={index}
                                             h4>{row.value}</Text>
                            }
                            else if (row.type === 'variable') {
                                return (
                                    <View key={index}
                                          style={{
                                        borderBottomColor: '#000000',
                                        borderBottomWidth: 1 }}
                                    >
                                        <TextInput
                                            placeholder="enter your answer here"
                                            height= {40}
                                            borderColor="gray"
                                                   editable = {true}
                                                   maxLength = {40}
                                                   onChangeText={
                                                       text => this.updateForm({answers: text})
                                                   }/>
                                    </View>
                                )
                            }
                        })
                        }

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

export default FillInTheBlanksQuestionWidget