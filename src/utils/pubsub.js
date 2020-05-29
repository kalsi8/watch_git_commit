export default {
  topics: {},
  publish: function(topic, data) {
    (this.topics[topic] || []).map(callback => {
      callback(data);
    });
  },
  subscribe: function(topic, callback) {
    if (typeof callback !== 'function') {
      throw new Error('callback should be of type function');
    }
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    const index = this.topics[topic].push(callback) - 1;
    return function(topics, index) {
      topics.splice(index, 1);
    }.bind(this, [this.topics, index]);
  },
};
