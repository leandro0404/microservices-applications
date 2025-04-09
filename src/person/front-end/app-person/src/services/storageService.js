import StatusType from '../constants/StatusType';

const STORAGE_KEY = 'person_data';

export const savePersonData = (data) => {
  try {
    // Garante que o status seja definido
    const dataWithStatus = {
      ...data,
      status: data.status || StatusType.INPROGRESS
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithStatus));
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
  }
};

export const loadPersonData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    return null;
  }
};

export const clearPersonData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
  }
};

export const updatePersonStatus = (status) => {
  try {
    const data = loadPersonData();
    if (data) {
      data.status = status;
      savePersonData(data);
    }
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
  }
}; 