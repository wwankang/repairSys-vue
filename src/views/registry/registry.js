
import { isvalidUsername } from '@/utils/validate'
export default {
  props: ['registryDialogShow'],
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error(this.$t('login.errorAccount') ))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error(this.$t('login.errorPassword')))
      } else {
        callback()
      }
    }
    return {

      registryForm: {
        username: '',
        password: ''
      },
      registryRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  watch:{
    registryDialogShow(newValue, oldValue){
        this.$emit("dialogStatusChange",newValue)
      debugger
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    login() {
      this.$router.push({ path: '/login' })
    },
    handleRegistry() {
      this.$refs.registryForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/registry', this.registryForm).then(() => {
            this.loading = false
            this.$message({
              message: '注册成功',
              type: 'success'
            })
            this.$router.push({ path: '/login' })
          }).catch((err) => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
