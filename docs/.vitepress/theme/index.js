import DefaultTheme from 'vitepress/theme'
import { onMounted, onUnmounted, watch, ref } from 'vue'
import './style.css'

export default {
  extends: DefaultTheme,
  setup() {
    const theme = ref(localStorage.getItem('vp-theme') || 'light')
    
    const updateTheme = (isDark) => {
      if (isDark) {
        theme.value = 'dark'
        document.documentElement.classList.add('dark')
      } else {
        theme.value = 'light'
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('vp-theme', theme.value)
      
      const toggles = document.querySelectorAll('.bb8-toggle__checkbox')
      toggles.forEach(toggle => {
        toggle.checked = isDark
      })
    }
    
    const handleToggleChange = (e) => {
      updateTheme(e.target.checked)
    }
    
    const bindToggles = () => {
      const toggles = document.querySelectorAll('.bb8-toggle__checkbox')
      toggles.forEach(toggle => {
        toggle.checked = theme.value === 'dark'
        toggle.removeEventListener('change', handleToggleChange)
        toggle.addEventListener('change', handleToggleChange)
      })
    }
    
    const bindDocAsideToggle = () => {
      const aside = document.querySelector('.VPDocAside')
      if (aside && !aside.querySelector('.aside-toggle')) {
        const toggle = document.createElement('div')
        toggle.className = 'aside-toggle'
        aside.appendChild(toggle)
        
        toggle.addEventListener('click', (e) => {
          e.stopPropagation()
          aside.classList.toggle('collapsed')
        })
      }
    }
    
    onMounted(() => {
      if (theme.value === 'dark') {
        document.documentElement.classList.add('dark')
      }
      bindToggles()
      bindDocAsideToggle()
      
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length > 0) {
            bindToggles()
            bindDocAsideToggle()
          }
        })
      })
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    })
    
    onUnmounted(() => {
      const toggles = document.querySelectorAll('.bb8-toggle__checkbox')
      toggles.forEach(toggle => {
        toggle.removeEventListener('change', handleToggleChange)
      })
    })
    
    watch(theme, (newTheme) => {
      localStorage.setItem('vp-theme', newTheme)
    })
  }
}
