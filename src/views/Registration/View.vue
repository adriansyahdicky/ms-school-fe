<template>
    <div>
      <div class="card">
        <div class="card-header">
          <h4>
            Registration
            <router-link to="/registration/create" class="btn btn-primary float-end">Add Registration</router-link>
          </h4>
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Mother Name</th>
                <th>Father Name</th>
                <th>Birth Date</th>
                <th>Place Birth</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="this.registration.length > 0">
              <tr v-for="rg in registration" :key="registration.id">
                <td>{{ rg.studentName }}</td>
                <td>{{ rg.phoneNumber }}</td>
                <td>{{ rg.motherName }}</td>
                <td>{{ rg.fatherName }}</td>
                <td>{{ formatDate(rg.birthDate) }}</td>
                <td>{{ rg.placeBirth }}</td>
                <td>{{ rg.address }}</td>
                <td>
                  <button class="btn btn-success" @click="openActivationPopup(rg.id)" :disabled="rg.isActive">Activate</button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="7">Loading...</td>
                </tr>
            </tbody>
          </table>
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: pagination.currentPage === 0 }">
                <a class="page-link" href="#" aria-label="Previous" @click="prevPage">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item" :class="{ active: i === pagination.currentPage }" v-for="i in pagination.totalPage" :key="i">
                <a class="page-link" href="#" @click="gotoPage(i)">{{ i + 1 }}</a>
              </li>
              <li class="page-item" :class="{ disabled: pagination.currentPage === pagination.totalPage - 1 }">
                <a class="page-link" href="#" aria-label="Next" @click="nextPage">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <div class="modal fade" id="activationModal" tabindex="-1" role="dialog" aria-labelledby="activationModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="activationModalLabel">Activate Registration</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label for="schoolFees">School Fees:</label>
            <input type="number" id="schoolFees" v-model="schoolFees" class="form-control" placeholder="Enter school fees">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary" @click="activateRegistration()">Activate</button>
          </div>
        </div>
      </div>
      </div>


  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'registration',
    data() {
      return {
        registration: [],
        pagination: {
          currentPage: 0,
          totalPage: 0
        }
      };
    },
    mounted() {
      this.getRegistration();
    },
    methods: {
      getRegistration() {
        axios.get('http://localhost:8181/course-management/registration')
          .then(res => {
            console.log({ res });
            this.registration = res.data.outputSchema.records;
            this.pagination = {
              currentPage: res.data.outputSchema.currentPage,
              totalPage: res.data.outputSchema.totalPage
            };
          })
          .catch(error => {
            console.error('Error fetching registration:', error);
          });
      },
      prevPage() {
        if (this.pagination.currentPage > 0) {
          this.gotoPage(this.pagination.currentPage - 1);
        }
      },
      nextPage() {
        if (this.pagination.currentPage < this.pagination.totalPage - 1) {
          this.gotoPage(this.pagination.currentPage + 1);
        }
      },
      gotoPage(page) {
        axios.get(`http://localhost:8181/course-management/registration?page=${page}`)
          .then(res => {
            this.registration = res.data.outputSchema.records;
            this.pagination.currentPage = res.data.outputSchema.currentPage;
          })
          .catch(error => {
            console.error('Error fetching registration:', error);
          });
      },
      formatDate(dateString) {
        // Implement date formatting logic here if needed
        return dateString;
      },
      openActivationPopup(id) {
      this.selectedRegistrationId = id;
      this.schoolFees = '';
      const modal = document.getElementById('activationModal');
      if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
      }
    },

    closeModal() {
      const modal = document.getElementById('activationModal');
      if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
      }
    },
      activateRegistration() {
        const id = this.selectedRegistrationId;
        const schoolFees = this.schoolFees;
        const data = { schoolFees };
        axios.put(`http://localhost:8181/course-management/registration/${id}`, data)
            .then(response => {
                console.log('Registration activated successfully:', response.data);
                // Refresh data pendaftaran setelah registrasi diaktifkan
                this.getRegistration();
                this.closeModal(); // Sembunyikan modal
            })
            .catch(error => {
                console.error('Error activating registration:', error);
            });
       }
    }
  };
  </script>
  