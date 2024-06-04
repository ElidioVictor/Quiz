import React, { useState, useEffect } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import style from './style';

const db = SQLite.openDatabase('quiz.db');

export default function Quiz() {
    const [pergunta, setPergunta] = useState('');
    const [alternativas, setAlternativas] = useState([]);
    const [respostaCorreta, setRespostaCorreta] = useState('');
    const [pontos, setPontos] = useState(0);
    const [perguntasVistas, setPerguntasVistas] = useState(new Set());
    const [totalPerguntas, setTotalPerguntas] = useState(0);

    useEffect(() => {
        carregarPergunta();
    }, []);

    const carregarPergunta = () => {
        if (totalPerguntas >= 10) {
            Alert.alert('Fim do Quiz', `Você completou o quiz com ${pontos} pontos!`);
            return;
        }

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM perguntas WHERE id NOT IN (' + Array.from(perguntasVistas).join(',') + ') ORDER BY RANDOM() LIMIT 1;', [], (_, { rows }) => {
                if (rows._array.length > 0) {
                    let pergunta = rows._array[0];
                    console.log('Pergunta carregada:', pergunta);
                    setPergunta(pergunta.pergunta);
                    setRespostaCorreta(pergunta.resposta_correta.trim());
                    setAlternativas([
                        pergunta.alternativaA.trim(),
                        pergunta.alternativaB.trim(),
                        pergunta.alternativaC.trim(),
                        pergunta.alternativaD.trim()
                    ]);

                    setPerguntasVistas(prev => new Set(prev).add(pergunta.id));
                    setTotalPerguntas(totalPerguntas + 1);
                } else {
                    Alert.alert('Erro', 'Nenhuma pergunta encontrada no banco de dados.');
                }
            }, (tx, error) => {
                console.log("Erro ao carregar pergunta:", error);
                Alert.alert('Erro', 'Falha ao carregar pergunta.');
            });
        });
    };

    const verificarResposta = (resposta) => {
        console.log('Resposta escolhida:', resposta);
        console.log('Resposta correta:', respostaCorreta);
        if (resposta.trim() === respostaCorreta) {
            Alert.alert('Parabéns!', 'Você acertou a resposta!');
            setPontos(pontos + 1);
            carregarPergunta();
        } else {
            Alert.alert('Ops!', 'Resposta incorreta.');
        }
    };

    return (
        <View style={style.quizView}>
            <Text>{`Total de pontos: ${pontos}`}</Text>
            <Text style={style.quizText} multiline={true}>
                {pergunta}
            </Text>
            {alternativas.map((alternativa, index) => (
                <View key={index} style={{ width: '90%', marginBottom: 15 }}>
                    <Button
                        title={`${String.fromCharCode(65 + index)}. ${alternativa}`}
                        onPress={() => verificarResposta(alternativa)}
                    />
                </View>
            ))}
            <View style={style.quizView}>
                <Button title="Próxima pergunta" onPress={carregarPergunta} />
            </View>
        </View>
    );
}
