import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import UploadCompleteWindow from './UploadCompleteWindow';

const AddNotePage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [content, setContent] = useState('');

  const [AddUploadWindowVisible, setAddUploadWindowVisible] = useState(false);

  const ShowUploadComplete = () => {
    setAddUploadWindowVisible(true);
  };

  const CloseUploadComplete = () => {
    setAddUploadWindowVisible(false);
  };

  const resetFields = () => {
    setName('');
    setDescription('');
    setTag('');
    setContent('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Note</Text>
      
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.textarea}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
      />
      
      <Text style={styles.label}>Tag</Text>
      <TextInput
        style={styles.input}
        value={tag}
        onChangeText={setTag}
        placeholder="Tag"
      />
      
      <Text style={styles.label}>Content</Text>
      <TextInput
        style={styles.textarea}
        value={content}
        onChangeText={setContent}
        placeholder="Description"
        multiline
      />
      <TouchableOpacity style={styles.uploadButton} >
        <Text style={styles.uploadButtonText}>Upload</Text>
      </TouchableOpacity>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={resetFields}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.publishButton} onPress={ShowUploadComplete}>
          <Text style={styles.publishButtonText}>Publish</Text>
        </TouchableOpacity>
      <UploadCompleteWindow visible={AddUploadWindowVisible} onClose={CloseUploadComplete} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#000',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  textarea: {
    height: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  uploadButton: {
    width: 100,
    height: 40,
    backgroundColor: '#4d90fe',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resetButton: {
    width: 100,
    height: 40,
    backgroundColor: '#ccc',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#000',
    fontSize: 16,
  },
  publishButton: {
    width: 100,
    height: 40,
    backgroundColor: '#3367d6',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddNotePage;
