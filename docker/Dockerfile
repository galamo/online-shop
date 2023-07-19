FROM node:18

RUN node -v 

RUN echo "THIS IS ONLY MESSAGE TO CONSOLE"

RUN touch index.js
COPY index.js index2.js 

# THIS LINE IS NOT PART OF THE BUILD BUT THE RUN CONTAINER FLOW
CMD ["node", "index2.js"] 