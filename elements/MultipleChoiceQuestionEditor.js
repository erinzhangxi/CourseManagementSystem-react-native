import React from 'react'
import {View, ScrollView, Alert} from 'react-native'
import {Text, Button, ListItem, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import ChoiceRow from './ChoiceRow'

class MultipleChoiceQuestionEditor extends React.Component {
    static navigationOptions = { title: "Multiple Choice"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: 0,
            solution: '',
            text:'',
            choices:[{key:'',content:''}]
        }
        this.addChoice = this.addChoice.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.renderChoiceList = this.renderChoiceList.bind(this);
        this.deleteChoice = this.deleteChoice.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.renderPreviewList = this.renderPreviewList.bind(this);
    }
    componentDidMount() {
        this.findAllChoices();
    }

    submitForm() {
        alert("Your form is successfully submitted.");
        {this.state.choices.map((choice, index) => {
            fetch('http://localhost:8080/api/choice/', {
                body: JSON.stringify(choice),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(response => (response.json()))
                .then(() => { this.findAllChoices(); })

        })}

    }
    findAllChoices() {
        fetch('http://localhost:8080/api/choices')
            .then(response => (response.json()))
            .then(choices => {
                this.setState({choices: choices})
            })
    }
    deleteChoice(choiceId) {
        alert("delete button is clicked");
        fetch('http://localhost:8080/api/choice/' + choiceId, {
            method: 'DELETE'
        }).then(response => (response.json()))
            .then(() => { this.findAllChoices(); })
    }

    addChoice(content) {
        alert("successfully added");
        this.setState({choices: this.state.choices.concat([{content: content}]),
                        text: ''})

    }
    updateForm(newState) {
        this.setState(newState)
    }
    renderChoiceList() {
        let choices = null;
        if(this.state) {
            choices = this.state.choices.map((choice, index) => {
                    return <ChoiceRow choice={choice}
                                      index={choice.id}
                                      delete={this.deleteChoice}
                                     />
                }
            )
        }
        return (
            choices
        )

    }
    renderPreviewList() {
        let choices = null;
        if(this.state) {
            choices = this.state.choices.map((choice, index) => {
                    return  <View style={{padding: 15}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text h5>{choice.content}</Text>

                        </View>
                    </View>
                }
            )
        }
        return (
            choices
        )
    }
    render() {
        return(
            <ScrollView>
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

                    <FormLabel>Multiple Choice Options</FormLabel>

                    {this.renderChoiceList()}
                    <FormLabel className="radioCustomLabel">Option</FormLabel>

                    <FormInput
                        placeholder="Enter multiple choice option here"
                        value={this.state.text}
                        type="radio"
                        className="radioCustomButton"
                        name="radioGroup"
                        onChangeText={
                            t => this.updateForm({text: t})}
                    />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end'}}>
                        <Button title="+"
                                titleStyle={{ fontWeight: "700" }}
                                buttonStyle={{
                                    backgroundColor: "rgba(92, 99,216, 1)",
                                    width: 100,
                                    height: 45,
                                    borderColor: "transparent",
                                    borderWidth: 0,
                                    borderRadius: 5
                                }}
                                containerStyle={{ marginTop: 20 }}
                                onPress={()=>this.addChoice(this.state.text)}
                        />
                    </View>

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
                        {this.renderPreviewList()}
                    </View>

                    <Button	backgroundColor="red"
                               color="white"
                               title="Cancel"
                               onPress={() => this.props.navigation
                                   .goBack() }/>
                    <Button	backgroundColor="blue"
                               color="white"
                               title="Submit"
                                onPress={()=> this.submitForm()}/>


                    <Text>
                        {"\n"}
                    </Text>

                </View>
            </ScrollView>
        )
    }
}

export default MultipleChoiceQuestionEditor
