# Survey

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.1.

## To install dependencies

Make sure you have node installed and run `npm install` in the root directory.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## To deploy

Copy the `.pem` file to directory outside the root directory and run `npm run deploy:prod`

## Question format

```json
{
  "heading": "Brand name (Title bar)",
  "title": "Test title",
  "version": 1,
  "steps": 7,
  "introduction": "Your description",
  "questions": [] // questions go here
}
```

#### Question types

- Radio button

```json
{
  "section": "A",
  "title": "What do you like?",
  "type": "radio",
  "alignment": "horizontal",
  "options": [
    {
      "title": "Mango",
      "color": ["red"]
    },
    {
      "title": "Orange"
    },
    {
      "title": "Apple"
    }
  ]
}
```

- Checkbox

```json
{
  "section": "A",
  "title": "Choose what you like?",
  "type": "checkbox",
  "alignment": "horizontal",
  "options": [
    {
      "title": "Mango",
      "color": ["red"]
    },
    {
      "title": "Orange"
    },
    {
      "title": "Apple"
    }
  ]
}
```

- Input

```json
{
  "section": "B",
  "title": "Which is your favorite subject?",
  "type": "input"
}
```

- Slider

```json
{
  "section": "C",
  "title": "Approximately how much would it cost?",
  "type": "slider",
  "alignment": "vertical",
  "sliderOptions": {
    "min": 120,
    "max": 200
  },
  "colors": ["grey", "green"],
  "options": [
    {
      "title": "Red",
      "config": {
        "initialValue": 0,
        "options": {
          "floor": 0,
          "ceil": 100
        }
      }
    },
    {
      "title": "Blue"
    },
    {
      "title": "Green"
    },
    {
      "title": "Yellow"
    }
  ]
}
```
