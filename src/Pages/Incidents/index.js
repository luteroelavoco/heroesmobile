import React, {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native' 
import {Feather } from '@expo/vector-icons'
import { FlatList } from 'react-native-gesture-handler';
import styles from './styles';
import logoImg from '../assets/logo.png';
import api from '../../services/api';

function Incidents() {

  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();

  async function loadIncidents(){
    const response = await api.get('incidents');
    setIncidents(response.data);
    setTotal(response.headers['x-total-count']);
  }

  useEffect(()=>{
    loadIncidents();
  },[])

  function navigateToDetail(incident){
    navigation.navigate('Detail',{ incident });
  }
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de<Text style={styles.headerTextBold} >  {total} casos </Text>
        </Text>
      </View>

      <Text style={styles.title}> Bem vindo !</Text>
      <Text style={styles.description}> Escolha um dos casos abaixo e salve o seu  dia.</Text>

    <FlatList 
      style={styles.incidentList}
      data={incidents}
      keyExtractor={incident => String(incident.id)}
      showsVerticalScrollIndicator={false}
      renderItem={({ item: incident }) => (
        <View style={styles.incident}>
          <Text style={styles.incidentProperty}>ONG:</Text>
          <Text style={styles.incidentValue}>{incident.name}</Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}>{ Intl.NumberFormat('pt-BR', { style: 'currency' , currency: 'BRL'}).format(incident.value)}</Text>

          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => navigateToDetail(incident)}>
            <Text style={styles.detailsButtonText}> Ver mais detalhe</Text>
            <Feather name="arrow-right" size={16} color="#E02041" />
          </TouchableOpacity>
        </View>

      )}
    />

    </View>
  )
}
export default Incidents;