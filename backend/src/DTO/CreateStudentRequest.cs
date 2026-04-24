using System.Collections.Generic;
using HogwartsHouses.Models.Types;

public class CreateStudentRequest
{
    public string Name { get; set; } = string.Empty;
    public PetType Pet { get; set; }
    public List<SortingAnswerHouse> Answers { get; set; } = new List<SortingAnswerHouse>();
}