<template>
    <div>
      <div class="card">
        <div class="card-header">
          <h4>
            Students
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
              </tr>
            </thead>
            <tbody v-if="this.students.length > 0">
              <tr v-for="student in students" :key="students.id">
                <td>{{ student.name }}</td>
                <td>{{ student.phoneNumber }}</td>
                <td>{{ student.motherName }}</td>
                <td>{{ student.fatherName }}</td>
                <td>{{ formatDate(student.birthDate) }}</td>
                <td>{{ student.placeBirth }}</td>
                <td>{{ student.address }}</td>
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

  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'students',
    data() {
      return {
        students: [],
        pagination: {
          currentPage: 0,
          totalPage: 0
        }
      };
    },
    mounted() {
      this.getStudents();
    },
    methods: {
      formatDate(dateString) {
        // Implement date formatting logic here if needed
        return dateString;
      },
      getStudents() {
        axios.get('http://localhost:8181/user-management/student')
          .then(res => {
            console.log({ res });
            this.students = res.data.outputSchema.records;
            this.pagination = {
              currentPage: res.data.outputSchema.currentPage,
              totalPage: res.data.outputSchema.totalPage
            };
          })
          .catch(error => {
            console.error('Error fetching student:', error);
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
        axios.get(`http://localhost:8181/user-management/student?page=${page}`)
          .then(res => {
            this.students = res.data.outputSchema.records;
            this.pagination.currentPage = res.data.outputSchema.currentPage;
          })
          .catch(error => {
            console.error('Error fetching student:', error);
          });
      }

    }
  };
  </script>
  