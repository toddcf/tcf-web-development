# BEM Declarations

## File Structure



## Buttons

### Primary Buttons

#### HTML

```
<a a href="https://toddcf.github.io/bmw-el-cajon/" target="_blank">
  <div class="button button_theme_primary">
    <div class="button__button-inner"><i class="fas fa-desktop"></i>Live Site</div>
  </div>
</a>
```

#### CSS

```
.button {
  margin-bottom: 1em;
  position: relative;
  transition: 300ms ease-in-out;
}

.button__button-inner {
  color: #fff;
  display: block;
  font-size: 16px;
  padding: 1em 0;
  text-align: center;
}

.button_theme_primary {
  background-image: linear-gradient(to bottom, var(--light-green) 0, var(--medium-green) 50%, var(--dark-green) 100%);
  background-position: left bottom;
  background-size: 100% 200%;
  border-radius: 5px;
  font-weight: bold;
  text-transform: uppercase;
}

.button_theme_primary:hover,
.button_theme_primary:active {
  background-position: left top;
}
```