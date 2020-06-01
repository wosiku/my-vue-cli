<script>
export default {
  render: function (h) {
    let arr = [{a: 1}, {a: 2}, {a: 3}];
    return (
      <div>
        {
          arr.map((ele) => {
            if (ele.a < 2) {
              return (
                <h2>a小于2</h2>
              );
            } else {
              return (
                <h2>a大于2</h2>
              );
            }
          })
        }
      </div>
    );
  }
};
</script>
