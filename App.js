import {StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Button} from 'react-native';
import {useState} from "react";
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

export default function App() {
    const [todo, setTodo] = useState([]);
    const [todoImp, setTodoImp] = useState([]);

    const Drawer = createDrawerNavigator();

    const MyTheme = {
        dark: false,
        colors: {
            primary: 'rgb(0,0,0)',
            background: 'rgba(255, 255, 255)',
            card: 'rgb(255,77,0)',
            text: 'rgb(0,0,0)',
            border: 'rgb(0,0,0)',
            notification: 'rgb(255,174,0)',
        },
    };

    const addTodo = (newTodo) => {
        if (newTodo !== "") {
            let id = 0;
            if (todo.length > 0) {
                id = todo[todo.length - 1].id + 1
            }
            setTodo([...todo, {id: id, text: newTodo}])
        }
    }

    const deleteTodo = (id) => {
        setTodo(todo.filter(item => item.id !== id))
    }

    const addTodoImp = (id) => {
        const newTodoArr = todo.filter(item => item.id === id)
        if (newTodoArr.length > 0) {
            const newTodo = newTodoArr[0].text
            let idImp = 0;
            if (todoImp.length > 0) {
                idImp = todoImp[todoImp.length - 1].id + 1
            }
            setTodoImp([...todoImp, {id: idImp, text: newTodo}])
            deleteTodo(id)
        }
    }

    const deleteTodoImp = (id) => {
        setTodoImp(todoImp.filter(item => item.id !== id))
    }

    const MainScreen = ({navigation}) => {
        const {colors} = useTheme();
        return (
            <View style={styles.container}>
                <TextInput placeholder={"Add ToDo"} onSubmitEditing={event => addTodo(event.nativeEvent.text)}
                           style={styles.textInput}/>
                <FlatList style={styles.flatListView} data={todo} renderItem={item =>
                    <View style={styles.flatListItem}>
                        <Text style={styles.flatListText}>{item.item.text}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => addTodoImp(item.item.id)}>
                            <Text style={styles.buttonText}>  Move  </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => deleteTodo(item.item.id)}>
                            <Text style={styles.buttonText}>  Remove  </Text>
                        </TouchableOpacity>
                    </View>}/>
                <Button color={colors.card} title={'Go to Important'} onPress={() => navigation.navigate('Important')}/>
            </View>
        )
    }

    const ImpScreen = () => {
        return (
            <View style={styles.container}>
                <FlatList style={styles.flatListView} data={todoImp} renderItem={item =>
                    <View style={styles.flatListItem}>
                        <Text style={styles.flatListText}>{item.item.text}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => deleteTodoImp(item.item.id)}>
                            <Text style={styles.buttonText}>  Remove  </Text>
                        </TouchableOpacity>
                    </View>}/>
            </View>
        )
    }

    return (
        <NavigationContainer theme={MyTheme}>
            <Drawer.Navigator useLegacyImplementation initialRouteName='Main'>
                <Drawer.Screen name={'Main'} component={MainScreen} options={{title: 'ToDo List'}}/>
                <Drawer.Screen name={'Important'} component={ImpScreen} options={{title: 'Important'}}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textInput: {
        backgroundColor: 'rgb(255,145,0)',
        height: 50,
        width: '90%',
        borderWidth: 2,
        borderRadius: 25,
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10
    },
    flatListView: {
        flex: 1,
        width: '85%'
    },
    flatListItem: {
        backgroundColor: 'rgb(255,190,51)',
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
        borderWidth: 2,
        borderRadius: 25
    },
    flatListText: {
        fontSize: 15,
        width: "50%",
        justifyContent: 'center'
    },
    button: {
        backgroundColor: 'rgb(255,60,0)',
        height: 20,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 50
    },
    buttonText: {
        fontSize: 10
    }
});
