import React, { useState, useEffect } from 'react';
import { Alert, Button, TextInput, View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
import style from './style';

const db = SQLite.openDatabase('quiz.db');

export default function Edit() {
    const [id, setId] = useState(null);
    const [pergunta, setPergunta] = useState('');
    const [alternativaA, setAlternativaA] = useState('');
    const [alternativaB, setAlternativaB] = useState('');
    const [alternativaC, setAlternativaC] = useState('');
    const [alternativaD, setAlternativaD] = useState('');
    const [respostaCorreta, setRespostaCorreta] = useState('');
    const [numPerguntas, setNumPerguntas] = useState(0); // Estado para armazenar o número de perguntas

    useEffect(() => {
        carregarPergunta();
    }, []);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('SELECT COUNT(*) AS num_perguntas FROM perguntas;', [], (_, { rows }) => {
                const { num_perguntas } = rows._array[0];
                setNumPerguntas(num_perguntas);
            });
        });
    }, []);


    const carregarPergunta = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM perguntas ORDER BY id LIMIT 1;', [], (_, { rows }) => {
                if (rows.length > 0) {
                    let pergunta = rows._array[0];
                    setId(pergunta.id);
                    setPergunta(pergunta.pergunta);
                    setAlternativaA(pergunta.alternativaA);
                    setAlternativaB(pergunta.alternativaB);
                    setAlternativaC(pergunta.alternativaC);
                    setAlternativaD(pergunta.alternativaD);
                    setRespostaCorreta(pergunta.resposta_correta);
                }
            });
        });
    };

    const atualizarPergunta = () => {
        db.transaction(tx => {
            tx.executeSql('UPDATE perguntas SET pergunta = ?, alternativaA = ?, alternativaB = ?, alternativaC = ?, alternativaD = ?, resposta_correta = ? WHERE id = ?;', 
            [pergunta, alternativaA, alternativaB, alternativaC, alternativaD, respostaCorreta, id], 
            () => {
                Alert.alert('Sucesso!', 'Pergunta atualizada com sucesso!');
            });
        });
    };

    const deletarPergunta = () => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM perguntas WHERE id = ?;', [id], () => {
                Alert.alert('Sucesso!', 'Pergunta deletada com sucesso!');
                carregarPergunta();
            });
        });
    };

    const proximaPergunta = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM perguntas WHERE id > ? ORDER BY id LIMIT 1;', [id], (_, { rows }) => {
                if (rows.length > 0) {
                    let pergunta = rows._array[0];
                    setId(pergunta.id);
                    setPergunta(pergunta.pergunta);
                    setAlternativaA(pergunta.alternativaA);
                    setAlternativaB(pergunta.alternativaB);
                    setAlternativaC(pergunta.alternativaC);
                    setAlternativaD(pergunta.alternativaD);
                    setRespostaCorreta(pergunta.resposta_correta);
                } else {
                    Alert.alert('Informação', 'Esta é a última pergunta.');
                }
            });
        });
    };

    const perguntaAnterior = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM perguntas WHERE id < ? ORDER BY id DESC LIMIT 1;', [id], (_, { rows }) => {
                if (rows.length > 0) {
                    let pergunta = rows._array[0];
                    setId(pergunta.id);
                    setPergunta(pergunta.pergunta);
                    setAlternativaA(pergunta.alternativaA);
                    setAlternativaB(pergunta.alternativaB);
                    setAlternativaC(pergunta.alternativaC);
                    setAlternativaD(pergunta.alternativaD);
                    setRespostaCorreta(pergunta.resposta_correta);
                } else {
                    Alert.alert('Informação', 'Esta é a primeira pergunta.');
                }
            });
        });
    };

    return (
        <View style={style.editView}>
            <TextInput 
                placeholder="Digite a pergunta" 
                value={pergunta} 
                multiline={true} 
                onChangeText={setPergunta} 
                numberOfLines={4}
                style={style.editPergunta} 
            />
            <TextInput 
                placeholder="Digite a alternativa A" 
                value={alternativaA} 
                onChangeText={setAlternativaA} 
                style={style.perguntaEdit} 
            />
            <TextInput 
                placeholder="Digite a alternativa B" 
                value={alternativaB} 
                onChangeText={setAlternativaB} 
                style={style.perguntaEdit} 
            />
            <TextInput 
                placeholder="Digite a alternativa C" 
                value={alternativaC} 
                onChangeText={setAlternativaC} 
                style={style.perguntaEdit} 
            />
            <TextInput 
                placeholder="Digite a alternativa D" 
                value={alternativaD} 
                onChangeText={setAlternativaD} 
                style={style.perguntaEdit} 
            />
            <TextInput 
                placeholder="Digite a letra da resposta correta" 
                value={respostaCorreta} 
                onChangeText={setRespostaCorreta} 
                style={style.editResposta} 
            />
            <View style={{ marginBottom: 15 }}>
                <Button title="Atualizar Pergunta" onPress={atualizarPergunta} color="gray" />
            </View>
            <Button  title="Deletar Pergunta" onPress={deletarPergunta} color="red" style={{ marginBottom: 5 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                <Button title="Voltar" onPress={perguntaAnterior}  color="gray" />
                <Button title="Avançar" onPress={proximaPergunta}  color="gray" />
            </View>
            <Text style={style.numPerguntas}>{`Total de perguntas: ${numPerguntas}`}</Text>
        </View>
    );
}
