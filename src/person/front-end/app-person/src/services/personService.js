import axios from 'axios';

const API_URL = 'https://m9p0a95wr1.execute-api.us-east-1.amazonaws.com/Prod/person';

class PersonService {
  async getPerson(idToken) {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching person:', error);
      throw error;
    }
  }

  async updatePerson(person, idToken) {
    try {
      const response = await axios.put(API_URL, person, {
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating person:', error);
      throw error;
    }
  }
}

export const personService = new PersonService(); 