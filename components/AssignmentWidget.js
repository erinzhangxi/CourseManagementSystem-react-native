import React from 'react'
import {View, TextInput, ScrollView} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'

class AssignmentWidget extends React.Component {
    static navigationOptions = { title: "Assignment"}
    constructor(props) {
        super(props)
        this.state = {
            title: 'default title',
            description: 'default description',
            points: 0,
            essay:'',
            link:'',
            isTrue: true
        }
    }
    updateForm(newState) {
        this.setState(newState)
    }
    updateLink(newState) {
        this.setState(newState)
    }
    render() {
        return(
            <ScrollView>
            <View style={{padding: 15}}>
                <Text h4>Assignment Widget</Text>
                <FormLabel>Assignment Title</FormLabel>
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
                <Text h4>Essay Answer</Text>
                <View style={{
                    backgroundColor: this.state.text,
                    borderBottomColor: '#000000',
                    borderBottomWidth: 1 }}
                >
                    <TextInput
                        placeholder="Enter your answer here"
                        multiline = {true}
                        numberOfLines = {4}
                        onChangeText={(essay) => this.setState({essay})}
                        value={this.state.essay}
                        editable = {true}
                        maxLength = {40}
                    />
                </View>
                <Text>
                    {"\n"}
                </Text>
                <Text h4 style={{bottom:10}}>Upload a file</Text>

                <Button
                    title='Choose File'
                />
                <Text h5 style={{padding: 15, color:"grey"}}>No file chosen</Text>
                <Text>
                    {"\n"}
                </Text>
                <Text h4>Submit a link</Text>
                <FormInput placeholder="Enter link here"
                           onChangeText={
                               link => this.updateLink({link: link})
                           }/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>
                <Button	backgroundColor="blue"
                           color="white"
                           title="Submit"/>


                <Text>
                    {"\n"}
                </Text>

            </View>
            </ScrollView>
        )
    }
}

export default AssignmentWidget