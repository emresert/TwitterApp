using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TwitterWebAPI.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int userId { get; set; }

        [Column(TypeName = "nvarchar(25)")]
        [Required]
        public string userName { get; set; }

        [Column(TypeName = "nvarchar(25)")]
        [Required]
        public string userSurname { get; set; }

        [Column(TypeName = "nvarchar(15)")]
        [Required]
        public string loginName { get; set; }

        [Column(TypeName = "nvarchar(8)")]
        [Required]
        public string password { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        [Required]
        public string email { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string imageUrl { get; set; }

        public List<Tweet> Tweets { get; set; }

    }
}
