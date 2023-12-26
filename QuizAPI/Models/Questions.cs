using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
    public class Questions
    {
        [Key]
        public int QnId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(250)")]
        public string QnInWords { get; set; } = string.Empty; 
        
        [Column(TypeName = "nvarchar(50)")]
        public string? ImageName { get; set; } 

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Option1 { get; set; } = string.Empty; 

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Option2 { get; set; } = string.Empty; 

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Option3 { get; set; } = string.Empty; 

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Option4 { get; set; } = string.Empty; 

        [Required]
        public string Answer { get; set; } = string.Empty; 
    }
}
