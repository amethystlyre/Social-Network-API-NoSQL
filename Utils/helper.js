module.exports = {

    dateConverter(date) {

        const options = {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        }

        return date.toLocaleString('en-US',options);
    
      }


  };
  