FROM mongo

COPY data.json ./

CMD mongoimport --host=mongodb:27017 --db=admin --collection=Movies --file=data.json
