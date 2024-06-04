import { StyleSheet } from "react-native";

export default StyleSheet.create({
    // Estilização do quiz
    quizView: {
        alignItems: 'center',
        width: '90%',
        marginHorizontal: 'auto',
        backgroundColor: '#E0E0E0', 
        borderRadius: 20,
        padding: 16,
        marginBottom: 15,
    },
    quizText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'justify',
    },

    // Estilização da home
    homeView1: {
        alignItems: 'center',
        backgroundColor: '#E0E0E0', 
        borderRadius: 20,
        padding: 16,
        marginBottom: 15,
    },
    homeView2: {
        marginBottom: 15,
    },
    homeView3: {
        marginBottom: 15,
    },
    logo:{
        width: 240,
        height: 240,
        borderRadius: 30,
        marginBottom: 45,
        borderColor: '#FF0000',
        borderWidth: 9
    },
    quiz10:{
        marginTop: 15
    },

    // Estilização do edit
    editView: { alignItems: 'center', marginTop: '20%'},

    editPergunta: {
        height: 120,
        borderColor: '#FF0000',
        borderWidth: 1,
        marginBottom: 10,
        width: '100%',
        borderRadius: 20,
        textAlign: 'center',
        backgroundColor: '#E0E0E0', 
    },
    editResposta: {
        height: 100,
        borderColor: '#FF0000',
        borderWidth: 1,
        marginBottom: 10,
        width: '100%',
        borderRadius: 20,
        textAlign: 'center',
        backgroundColor: '#E0E0E0', 
    },
    perguntaEdit: {
        height: 60,
        borderColor: '#FF0000',
        borderWidth: 1,
        marginBottom: 10,
        width: '90%',
        borderRadius: 20,
        textAlign: 'center',
        backgroundColor: '#E0E0E0', 
    },

    // Estilização do componente de adicionar pergunta
    novaPergunta: {
        height: 80,
        borderColor: '#FF0000',
        borderWidth: 1,
        marginBottom: 15,
        width: '100%',
        borderRadius: 20,
        textAlign: 'center',
        backgroundColor: '#E0E0E0', 
    },
    alternativa: {
        borderColor: '#FF0000',
        borderWidth: 1,
        marginBottom: 10,
        width: '100%',
        height: 40,
        borderRadius: 20,
        textAlign: 'center',
        backgroundColor: '#E0E0E0',
    },
    resposta: {
        borderColor: '#FF0000',
        borderWidth: 1,
        marginBottom: 10,
        width: '100%',
        height: 60,
        borderRadius: 20,
        textAlign: 'center',
        backgroundColor: '#E0E0E0', 
    },
});
