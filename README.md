# Sheppard Studios Portfolio

A modern, responsive portfolio website built with React and Tailwind CSS, showcasing professional experience and projects.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)


## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/shep517/sheppard-studios.git
cd sheppard-studios
```

2. Install dependencies:
```bash
npm install
```

This will install all required dependencies including:
- React and React DOM
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- Other development dependencies



## Available Scripts

In the project directory, you can run:



### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.



### `npm run build`

Builds the app for production



## Project Structure

```
sheppard-studios/
├── public/          # Static files
├── src/            # Source files
│   ├── components/ # React components
│   ├── pages/      # Page components
│   └── App.js      # Main application component
├── package.json    # Project dependencies and scripts
└── tailwind.config.js # Tailwind CSS configuration
```


## Deployment

This site is hosted as a static site on **AWS S3** with **CloudFront** as the CDN.

### Infrastructure

- **S3 Bucket:** `sheppard-studios.com` — stores the production build output
- **CloudFront** — serves the site with caching and HTTPS

### Auto-Deployment

Pushes to the `main` branch trigger a **GitHub Actions** workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) that:

1. Installs dependencies and runs `npm run build`
2. Syncs the `build/` folder to the S3 bucket
3. Invalidates the CloudFront cache so changes go live immediately

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM access key with S3 and CloudFront permissions |
| `AWS_SECRET_ACCESS_KEY` | Corresponding secret key |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID |


## Technologies Used

- React
- Tailwind CSS
- Lucide React (for icons)


## License

This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details. 