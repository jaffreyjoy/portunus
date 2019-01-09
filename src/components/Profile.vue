<template>
  <div class="header pb-8 pt-6 pt-md-7">
    <div class="container-fluid">
      <div class="header-body">
        <div class="container mt--4 pb-5">
          <!-- Table -->
          <div class="row justify-content-center mt-5">
            <div class="card bg-secondary shadow">
              <div class="card-header bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">My account</h3>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <form>
                  <h6 class="heading-small text-muted mb-4">User information</h6>
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="form-control-label" for="input-username">Name</label>
                          <input
                            type="text"
                            id="input-username"
                            class="form-control form-control-alternative"
                            v-model="name"    
                          >
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label class="form-control-label" for="input-username">Username</label>
                          <input
                            type="text"
                            id="input-username"
                            class="form-control form-control-alternative"
                            v-model="username"
                          >
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label class="form-control-label" for="input-email">Email address</label>
                          <input
                            type="email"
                            id="input-email"
                            class="form-control form-control-alternative"
                            v-model="email"
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Upload Modal -->
    <UploadModal />
  </div>
</template>
<script>
import UploadModal from './UploadModal';
export default {
  name: "Profile",
  components: {
    UploadModal
  },
  data() {
    return {
      name: localStorage.name,
      username: localStorage.username,
      email: localStorage.email
    };
  }
};
</script>
