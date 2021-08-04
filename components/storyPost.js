import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class StoryPost extends React.Component {
    constructor() {
        super();
        this.state = { expanded: false };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{alignSelf: 'center', justifyContent: 'center'}}>
                    <Text style={styles.textDate}>
                        {(() => {
                            var d = new Date(this.props.time);
                            if (d.toLocaleString() === "Invalid Date") {
                                return "";
                            }
                            return d.toLocaleString();
                        })()}
                    </Text>
                    <View style={styles.titleAndAuthorContainer}>
                        <Text style={styles.titleTxt}>
                            {this.props.title}
                        </Text>
                        <Text style={styles.authorTxt}>
                            by {this.props.author}
                        </Text>
                    </View>

                    {/* {(() => {
                    if (this.props.story.length > 200)
                    {
                        return (
                            <TouchableOpacity style={styles.btn} onPress={this.toggleExpand}>
                                <Text style={styles.btnTxt}>
                                    {this.state.expanded ? "Collapse" : "Expand"}
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                })()} */}

                    {/* {(() => {
                    if (this.props.story.length > 200)
                    {
                        if (this.state.expanded)
                        {
                            return (
                                <Text style={styles.storyTxt}>
                                    {this.props.story}
                                </Text>
                            )
                        }
                        else
                        {
                            return (
                                <Text style={styles.storyTxt}>
                                    {this.props.story.substr(0, 200) + "...\n\n(Click Expand to expand)"}
                                </Text>
                            )
                        }
                    }
                    else
                    {
                        return (
                            <Text style={styles.storyTxt}>
                                {this.props.story}
                            </Text>
                        )
                    }
                })()} */}
                    <Text>
                        <Text style={styles.storyTxt}>
                            {this.props.story}
                        </Text>
                    </Text>
                </View>
            </View>
        );
    }

    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "95%",
        maxWidth: 10000,
        borderWidth: 2,
        marginVertical: 30,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 50,
        backgroundColor: "#eeeeee",
        justifyContent: 'center'
    },
    titleAndAuthorContainer: {
        width: 500,
        maxWidth: "95%",
        borderBottomWidth: 2,
        paddingBottom: 10,
        marginBottom: 10
    },
    titleTxt: {
        fontSize: 25
    },
    authorTxt: {
        fontSize: 18,
        color: "#666666",
        marginLeft: 20
    },
    storyTxt: {
        fontSize: 16,
        marginBottom: 10,
    },
    btn: {
        width: "50%",
        height: 30,
        alignSelf: 'center',
        marginVertical: 10,
        backgroundColor: "#cdcdcd",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    btnTxt: {
        fontSize: 20,
        color: "#444444"
    },
    textDate: {
        textAlign: 'right',
        fontSize: 10,
        color: 'gray'
    }
});