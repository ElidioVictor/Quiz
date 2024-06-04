import React from 'react';
import { Button, View, Image } from 'react-native';
import style from './style';

export default function Home({ navigation }) {
    return (
        <View style={style.homeView1}>
            <Image style={style.logo}
                source={require('../assets/logo.jpeg')}></Image>
            <View style={style.homeView2}>
                <Button title="Adicionar Pergunta" onPress={() => navigation.navigate('Add')} color="gray" />
            </View>

            <View style={style.homeView3}>
                <Button title="Iniciar Quiz" onPress={() => navigation.navigate('Quiz')} color="gray" />
            </View>

            <Button title="Editar Perguntas" onPress={() => navigation.navigate('Edit')} color="gray" />

            <View style={style.quiz10}>
                <Button title="Quiz 10" onPress={() => navigation.navigate('Quiz10')} color="gray" />
            </View>
        </View>
    );
}

