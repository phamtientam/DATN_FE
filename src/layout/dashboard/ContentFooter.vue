<template>
  <footer class="footer">
    <div class="container-fluid d-flex flex-wrap justify-content-between">
      <nav>
        <ul>
          <li>
            <router-link :to="{ path: '/admin' }">Dashboard</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright d-flex flex-wrap">
        &copy; Coded with
        <i class="fa fa-heart heart"></i> by
        <a href="https://www.facebook.com/tam.phamtien.904" target="_blank">
          &nbsp; Pham Tien Tam.</a
        >&nbsp; Designed And Creator by
        <a href="https://www.facebook.com/tam.phamtien.904" target="_blank"
          >&nbsp; Pham Tien Tam.</a
        >
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style></style>
