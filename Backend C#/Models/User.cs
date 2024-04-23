namespace Assesment.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string? Address { get; set; }
        public string? Company { get; set; }
        public string? Notes { get; set; }
        public List<User> Contacts = new List<User>();

        public User(int id, string name, string email, string phone, string? address, string? company, string? notes)
        {
            if (name == null || email == null || phone == null)
            {
                throw new System.ArgumentException("Name, Email and Phone are required");
            }

            Id = id;
            Name = name;
            Email = email;
            Phone = phone;
            Address = address;
            Company = company;
            Notes = notes;
            Contacts = new List<User>();
        }
    }
}