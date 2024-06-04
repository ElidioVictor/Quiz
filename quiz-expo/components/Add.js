import React, { useState, useEffect } from 'react';
import { Alert, Button, TextInput, View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
import style from './style';

const db = SQLite.openDatabase('quiz.db');

export default function Add() {
    const [pergunta, setPergunta] = useState('');
    const [alternativaA, setAlternativaA] = useState('');
    const [alternativaB, setAlternativaB] = useState('');
    const [alternativaC, setAlternativaC] = useState('');
    const [alternativaD, setAlternativaD] = useState('');
    const [respostaCorreta, setRespostaCorreta] = useState('');
    const [numPerguntas, setNumPerguntas] = useState(0); // Estado para armazenar o número de perguntas

    // Verificando a quantidade de perguntas existentes no banco de dados
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('SELECT COUNT(*) AS num_perguntas FROM perguntas;', [], (_, { rows }) => {
                const { num_perguntas } = rows._array[0];
                setNumPerguntas(num_perguntas);
            });
        });
    }, []);

    // Criando a tabela 'perguntas' se ela não existir no banco de dados
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS perguntas (id INTEGER PRIMARY KEY AUTOINCREMENT, pergunta TEXT, alternativaA TEXT, alternativaB TEXT, alternativaC TEXT, alternativaD TEXT, resposta_correta TEXT)'
            );
        });
    }, []);

    // Função para adicionar uma pergunta ao banco de dados
    const adicionarPergunta = () => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO perguntas (pergunta, alternativaA, alternativaB, alternativaC, alternativaD, resposta_correta) VALUES (?, ?, ?, ?, ?, ?);',
                [pergunta, alternativaA, alternativaB, alternativaC, alternativaD, respostaCorreta],
                (_, { insertId }) => {
                    setPergunta('');
                    setAlternativaA('');
                    setAlternativaB('');
                    setAlternativaC('');
                    setAlternativaD('');
                    setRespostaCorreta('');
                    setNumPerguntas(numPerguntas + 1); // Incrementando a contagem de perguntas
                    Alert.alert('Sucesso!', 'Pergunta adicionada com sucesso!');
                }
            );
        });
    };

    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={style.numPerguntas}>{`Total de perguntas: ${numPerguntas}`}</Text>
            <TextInput
                placeholder="Digite a pergunta"
                value={pergunta}
                multiline={true}
                onChangeText={setPergunta}
                numberOfLines={4}
                style={style.novaPergunta}
            />
            <TextInput
                placeholder="Digite a alternativa A"
                value={alternativaA}
                onChangeText={setAlternativaA}
                style={style.alternativa}
            />
            <TextInput
                placeholder="Digite a alternativa B"
                value={alternativaB}
                onChangeText={setAlternativaB}
                style={style.alternativa}
            />
            <TextInput
                placeholder="Digite a alternativa C"
                value={alternativaC}
                onChangeText={setAlternativaC}
                style={style.alternativa}
            />
            <TextInput
                placeholder="Digite a alternativa D"
                value={alternativaD}
                onChangeText={setAlternativaD}
                style={style.alternativa}
            />
            <TextInput
                placeholder="Digite a resposta correta (por extenso)"
                value={respostaCorreta}
                onChangeText={setRespostaCorreta}
                style={style.resposta}
            />
            <Button title="Adicionar Pergunta" onPress={adicionarPergunta} color="gray" />
        </View>
    );
}
