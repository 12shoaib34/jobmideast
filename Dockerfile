# build env
# FROM node:13.12.0-alpine as build
FROM node:14.15-alpine AS build
WORKDIR /app
COPY package*.json ./
ENV GENERATE_SOURCEMAP=false
ENV REACT_APP_VERSION=0.1.0
ENV REACT_APP_BASE_URL=https://backend.jobsmideast.com
ENV REACT_APP_MAP_KEY=AIzaSyDxfSNbgNkKIDu45-aJdQpfHwMd7Dft3T4
ENV REACT_APP_HOMEPAGE_URL=https://jobsmideast.com
ENV REACT_APP_CANDIDATE_PORTAL_URL=https://candidate.jobsmideast.com
ENV REACT_APP_EMPLOYER_PORTAL_URL=https://employer.jobsmideast.com
ENV REACT_APP_AGENCY_PORTAL_URL=https://agency.jobsmideast.com
ENV REACT_APP_CHAT_URL=https://socket.jobsmideast.com/chat
ENV REACT_APP_STRIPE_KEY=pk_live_51IsNBCHAwOqzN7PCNTuOIwVhKYqOaaAcLowtpYg8Ky20NTPIwHKtnLbvP6J7KJFNxlKLkb0fM338B5pkdzgJLPL700eDzKo1Lv
ENV GOOGLE_API_KEY=AIzaSyBQtLPrSMDHxvUvf5MS0zkhyydMRwnndzQ

RUN yarn
COPY . ./
RUN npm run build

# production env
FROM nginx:alpine
# FROM 032274180776.dkr.ecr.eu-central-1.amazonaws.com/nginx-images:stable
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.config /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
