<template>
  <div class="header pb-8 pt-6 pt-md-7">
    <div class="container-fluid">
      <div class="header-body">
        <div class="container mt--4 pb-5">
          <!-- Table -->
          <div class="row justify-content-center mt-5">
            <div class="col-lg-6 col-md-8">
              <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-5 py-lg-5">
                  <form role="form">
                    <div class="form-group">
                      <div class="input-group input-group-alternative mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="ni ni-hat-3"></i>
                          </span>
                        </div>
                        <input class="form-control" type="text" v-model="name" disabled>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="input-group input-group-alternative mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="ni ni-hat-3"></i>
                          </span>
                        </div>
                        <input class="form-control" type="text" v-model="username" disabled>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="input-group input-group-alternative mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="ni ni-hat-3"></i>
                          </span>
                        </div>
                        <input class="form-control" type="text" v-model="email" disabled>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Profile",
  data() {
    return {
      name: localStorage.name,
      username: localStorage.username,
      email: localStorage.email
    };
  }
};
</script>
