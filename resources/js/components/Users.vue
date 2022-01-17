<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">User Management</h3>

                        <div class="card-tools">
                            <button
                                class="btn btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#addNew"
                            >
                                Add new <i class="fas fa-user-plus"></i>
                            </button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover text-nowrap">
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    <th>Registered At</th>
                                    <th>Modify</th>
                                </tr>

                                <tr v-for="user in users.data" :key="user.id">
                                    <td>{{ user.id }}</td>
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.type | upText }}</td>
                                    <td>{{ user.created_at | myDate }}</td>

                                    <td>
                                        <a href="#" @click="editModal(user)">
                                            <i class="fa fa-edit yellow"></i>
                                        </a>
                                        |
                                        <a href="#" @click="deleteUser(user.id)">
                                            <i class="fa fa-trash red"></i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
        </div>
        <!-- Modal -->
        <div
            class="modal fade"
            id="addNew"
            tabindex="-1"
            role="dialog"
            aria-labelledby="addNewLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" v-show="!editmode" id="addNewLabel">Add New</h5>
                         <h5 class="modal-title" v-show="editmode" id="addNewLabel">Update User's Info</h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close">
                             <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="editmode ? updateUser() : createUser()">
                        <div class="modal-body">
                            <!-- Campuri add user -->
                            <!-- Name -->
                            <div class="form-group">
                                <input
                                    v-model="form.name"
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    class="form-control"
                                />
                                <div
                                    v-if="form.errors.has('name')"
                                    v-html="form.errors.get('name')"
                                />
                            </div>
                            <!-- Email -->
                            <div class="form-group">
                                <input
                                    v-model="form.email"
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    class="form-control"
                                />
                                <div
                                    v-if="form.errors.has('email')"
                                    v-html="form.errors.get('email')"
                                />
                            </div>
                            <!-- Bio -->
                            <div class="form-group">
                                <input
                                    v-model="form.bio"
                                    id="bio"
                                    name="bio"
                                    placeholder="Short bio for user (Optional)"
                                    class="form-control"
                                />
                                <div
                                    v-if="form.errors.has('bio')"
                                    v-html="form.errors.get('bio')"
                                />
                            </div>
                            <!-- Role -->
                            <div class="form-group">
                                <select
                                    name="type"
                                    v-model="form.type"
                                    id="type"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has('type'),
                                    }"
                                >
                                    <option value="">Select User Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">Standard User</option>
                                    <option value="author">Author</option>
                                </select>
                                <div
                                    v-if="form.errors.has('type')"
                                    v-html="form.errors.get('type')"
                                />
                            </div>
                            <!-- Password -->
                            <div class="form-group">
                                <input
                                    v-model="form.password"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    class="form-control"
                                />
                                <div
                                    v-if="form.errors.has('password')"
                                    v-html="form.errors.get('password')"
                                />
                            </div>
                        </div>

                        <div class="modal-footer" bg-black>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button v-show="editmode" type="submit" class="btn btn-success">Update</button>
                    <button v-show="!editmode" type="submit" class="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            editmode: false,
            users: {},
            form: new Form({
                  id:"",
                name: "",
                email: "",
                password: "",
                type: "",
                bio: "",
                photo: "",
            }),
        };
    },
    methods: {
        editModal(user){
            this.editmode = true;
            this.form.reset();
             $('#addNew').modal('show');
            this.form.fill(user);
        },
        newModal(){
            this.editmode = false;
            this.form.reset();
            $('#addNew').modal('show');
        },
            deleteUser(id){
                Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
// send request to the server
if (result.isConfirmed) {
    
    this.form.delete('/api/user/'+id).then(()=>{
       Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
     )
     this.$emit("AfterCreate");
     }).catch(()=>{
swal("Failed", "There was something wrong.", "warning");
       });
  
    }
})
            },


        loadUsers() {
            axios.get("api/user").then(({ data }) => (this.users = data));
        },
        createUser() {
            this.$Progress.start();
            this.form
                .post("api/user")
                .then(() => {
                    this.$emit("AfterCreate");
                    addNew.hide();

                    Toast.fire({
                        icon: "success",
                        title: "User created successfully",
                    });

                    this.$Progress.finish();
                })
                .catch(() => {});
        },
    },
    created() {
        this.loadUsers();
        this.$on("AfterCreate", () => {
            this.loadUsers();
        });
    },
};
</script>
