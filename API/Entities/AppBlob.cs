using System;

namespace API.Entities
{
    public class AppBlob
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FileHeader { get; set; }
        public byte[] FileData { get; set; }
        public int FileSize { get; set; }
        public DateTime UploadTime { get; set; } = DateTime.Now;
    }
}