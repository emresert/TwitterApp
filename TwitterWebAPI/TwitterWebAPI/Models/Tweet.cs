using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TwitterWebAPI.Models
{
    [Table("Tweets")]
    public class Tweet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int tweetId { get; set; }

        [Column(TypeName = "nvarchar(280)")]
        public string tweetContent { get; set; }
        [Column(TypeName = "smalldatetime")]
        public DateTime tweetDate { get; set; }

        [ForeignKey("userIdFk")]
        public User User { get; set; }
    }
}
