<template>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <h4>Registration</h4>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="studentName">Name</label>
            <input type="text" id="studentName" v-model="formData.studentName" class="form-control"/>
          </div>
          <div class="mb-3">
            <label for="address">Address</label>
            <input type="text" id="address" v-model="formData.address" class="form-control"/>
          </div>
          <div class="mb-3">
            <label for="phoneNumber">Phone Number</label>
            <input type="text" id="phoneNumber" v-model="formData.phoneNumber" class="form-control"/>
          </div>
          <div class="mb-3">
            <label for="motherName">Mother Name</label>
            <input type="text" id="motherName" v-model="formData.motherName" class="form-control"/>
          </div>
          <div class="mb-3">
            <label for="fatherName">Father Name</label>
            <input type="text" id="fatherName" v-model="formData.fatherName" class="form-control"/>
          </div>
          <div class="mb-3">
            <label for="birthDate">Birth Date</label>
            <input type="date" id="birthDate" v-model="formData.birthDate" class="form-control"/>
          </div>
          <div class="mb-3">
            <label for="placeBirth">Place Birth</label>
            <input type="text" id="placeBirth" v-model="formData.placeBirth" class="form-control"/>
          </div>
          <div class="mb-3">
          <label for="religion">Religion</label>
          <select id="religion" v-model="formData.religion" class="form-control">
            <option value="" disabled selected>Select Religion</option>
            <option value="islam">Islam</option>
            <option value="christian">Christian</option>
            <option value="hindu">Hindu</option>
            <option value="buddha">Buddha</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="zipCode">Zip Code</label>
          <input type="text" id="zipCode" v-model="formData.zipCode" class="form-control"/>
        </div>
        <div class="mb-3">
          <label for="lastSchool">Last School</label>
          <input type="text" id="lastSchool" v-model="formData.lastSchool" class="form-control"/>
        </div>
        <div class="mb-3">
          <label for="schoolFees">School Fees</label>
          <input type="number" id="schoolFees" v-model="formData.schoolFees" class="form-control"/>
        </div>
          <div class="mb-3">
            <input type="button" class="btn btn-primary" value="Save" @click="saveStudent"/>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        formData: {
          studentName: '',
          address: '',
          phoneNumber: '',
          motherName: '',
          fatherName: '',
          birthDate: '',
          placeBirth: '',
          religion: '',
          zipCode: '',
          lastSchool: '',
          schoolFees: 0
        }
      }
    },
    methods: {
      saveStudent() {
        axios.post('http://localhost:8181/course-management/registration', this.formData)
          .then(response => {
            console.log(response.data);
            this.$router.push('/registration');
          })
          .catch(error => {
            console.error('Error saving registration:', error);
            // Tangani kesalahan jika penyimpanan gagal
          });
      }
    }
  }
  </script>
  